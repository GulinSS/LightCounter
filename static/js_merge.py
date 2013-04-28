# -*- coding: utf-8 -*-
# Date: 26.05.12
# http://stackoverflow.com/questions/1199470/combine-javascript-files-at-deployment-in-python

import os, os.path, shutil

def merge(in_files, out_file):
    temp = open(out_file, 'w')
    for f in in_files:
        fh = open(f)
        data = fh.read() + '\n'
        fh.close()

        temp.write(data)

        print ' + %s' % f
    temp.close()

SCRIPTS = [
    'app/js/libs/EventSource.js',
    'app/js/libs/Hash.js',
    'app/js/libs/JSON.js',
    'app/js/libs/ServiceClient.js',
    'app/js/libs/jquery.hash.js',
    'app/js/libs/Application.js',
    'app/js/intro.js',
    'app/js/jquery-extras.js',
    'app/js/settings.js',
    'app/js/api.js',
    'app/js/game.js',
    'app/js/user.js',
    'app/js/pages.intro.js',
    'app/js/pages.home.js',
    'app/js/pages.log-in.js',
    'app/js/pages.log-out.js',
    'app/js/pages.new-command.js',
    'app/js/pages.new-frame.js',
    'app/js/pages.not-found.js',
    'app/js/pages.register.js',
    'app/js/pages.outro.js',
    'app/js/outro.js',
    ]

SCRIPTS_OUT = 'app/js/multifarce.min.js'

STYLESHEETS = [
    'app/media/style.css',
    ]

STYLESHEETS_OUT = 'app/media/style.min.css'

def main():
    print 'Merge JavaScript...'
    merge(SCRIPTS, SCRIPTS_OUT)

    print 'Merge CSS...'
    merge(STYLESHEETS, STYLESHEETS_OUT)

if __name__ == '__main__':
    main()