from os.path import expanduser as _expanduser

from fabric.api import run, cd, env, local, put, sudo
from fabric.contrib.project import rsync_project
from paramiko.config import SSHConfig as _SSHConfig


env.hosts = ['friendstream.tv']

ROOT_DIR = '/var/www/friendstream'


def _upload_git_project():
    """
    Upload the current project to a remote system, tar/gzipping during the move.

    This function makes use of the ``/tmp/`` directory and the ``tar`` and
    ``gzip`` programs/libraries; thus it will not work too well on Win32
    systems unless one is using Cygwin or something similar.

    ``upload_project`` will attempt to clean up the tarfiles when it finishes
    executing.
    """
    from datetime import datetime
    from os import getcwd, sep

    tar_file = "/tmp/fab.%s.tar" % datetime.utcnow().strftime(
        '%Y_%m_%d_%H-%M-%S')
    cwd_name = getcwd().split(sep)[-1]
    tgz_name = cwd_name + ".tar.gz"

    # Instead of just tarring up the existing files, use git archive.
    local("git archive --format=tar HEAD | gzip -9 > %s" % tar_file)

    put(tar_file, cwd_name + ".tar.gz")
    local("rm -f " + tar_file)
    run("tar -xzf " + tgz_name)
    # We can't easily make tar leave the existing file perms in place, so just make sure everything's group writable.
    run("chmod -R g+w .")
    run("rm -f " + tgz_name)


def host_type():
    """Show the server's OS (for testing)."""
    run('uname -s')

def push():
    """Upload your working copy to the server."""
    with cd(ROOT_DIR):
        _upload_git_project()

upload = push

def restart_web():
    """Restart the web server (gunicorns) only."""
    # TODO: what if supervisord isn't running?
    sudo('supervisorctl restart web')

def restart_worker():
    """Restart the workers (celerys) only."""
    # TODO: what if supervisord isn't running?
    sudo('supervisorctl restart worker')

def collectstatic():
    """Collect static files for nginx. (Necessary for static file changes to show!)"""
    with cd('%s/website' % ROOT_DIR):
        run('%s/env/bin/python manage.py collectstatic' % (ROOT_DIR,), shell=True)

def migrate_db():
    """Run outstanding database schema migrations (with South)."""
    with cd('%s/website' % ROOT_DIR):
        run('%s/env/bin/python manage.py migrate friendstream' % (ROOT_DIR,), shell=True)

def restart():
    """Restart everything. (Collects static files, runs schema migrations, restarts webs and workers.)"""
    collectstatic()
    migrate_db()
    restart_web()
    restart_worker()


def _annotate_hosts_with_ssh_config_info():
    def hostinfo(host, config):
        hive = config.lookup(host)
        if 'hostname' in hive:
            host = hive['hostname']
        if 'user' in hive:
            host = '%s@%s' % (hive['user'], host)
        if 'port' in hive:
            host = '%s:%s' % (host, hive['port'])
        return host

    try:
        config_file = file(_expanduser('~/.ssh/config'))
    except IOError:
        pass
    else:
        config = _SSHConfig()
        config.parse(config_file)
        keys = [config.lookup(host).get('identityfile', None)
            for host in env.hosts]
        env.key_filename = [_expanduser(key) for key in keys if key is not None]
        env.hosts = [hostinfo(host, config) for host in env.hosts]

_annotate_hosts_with_ssh_config_info()
