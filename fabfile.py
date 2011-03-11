from fabric.api import run, cd, env

from fabric.contrib.project import rsync_project


env.hosts = ['gercheq@friendstream.tv']

ROOT_DIR = '/home/gercheq/webapps/django'


def upload():
    rsync_project(remote_dir='%s/lib/python2.6' % ROOT_DIR, local_dir='friendstream', exclude='*.pyc')

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
