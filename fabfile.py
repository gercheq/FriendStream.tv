from os.path import expanduser as _expanduser

from fabric.api import run, cd, env
from fabric.contrib.project import rsync_project
from paramiko.config import SSHConfig as _SSHConfig


env.hosts = ['friendstream.tv']

ROOT_DIR = '/home/gercheq/webapps/django'


def host_type():
    run('uname -s')

def push():
    rsync_project(remote_dir='%s/lib/python2.6' % ROOT_DIR, local_dir='friendstream', exclude='*.pyc')

upload = push

def restart_apache():
    with cd(ROOT_DIR):
        run('apache2/bin/restart')

def restart_worker():
    # TODO: what if supervisord isn't running?
    with cd(ROOT_DIR):
        run('supervisorctl restart friendstreamtv')

def collectstatic():
    with cd('%s/myproject' % ROOT_DIR):
        run('PYTHONPATH=%s/lib/python2.6:%s/../../lib/python2.6 python2.6 manage.py collectstatic' % (ROOT_DIR, ROOT_DIR), shell=True)

def migrate_db():
    with cd('%s/myproject' % ROOT_DIR):
        run('PYTHONPATH=%s/lib/python2.6:%s/../../lib/python2.6 python2.6 manage.py migrate friendstream' % (ROOT_DIR, ROOT_DIR), shell=True)

def restart():
    collectstatic()
    migrate_db()
    restart_apache()
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
