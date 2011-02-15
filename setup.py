from setuptools import setup

setup(
    name='friendstream',
    version='1.0',
    packages=['friendstream'],
    include_package_data=True,

    requires=['Django', 'celery', 'redis', 'twitter', 'oauth2'],
    install_requires=['Django', 'celery', 'redis', 'python-twitter', 'oauth2'],
)
