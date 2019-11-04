import * as os from 'os';
import * as util from 'util';

import * as toolCache from '@actions/tool-cache';
import * as core from '@actions/core';

function downloadUrl(version: string): string {
    switch (os.type()) {
        case 'Linux':
            return util.format('https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.4.0/aws-iam-authenticator_%s_linux_amd64', version);

        case 'Darwin':
            return util.format('https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.4.0/aws-iam-authenticator_%s_darwin_amd64', version);

        case 'Windows_NT':
        default:
            return util.format('https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.4.0/aws-iam-authenticator_%s_windows_amd64.exe', version);

    }
}

const binaryName = 'aws-iam-authenticator'

async function run() {
    let version = core.getInput('version', { 'required': true });
    let cachedToolpath = toolCache.find(binaryName, version);
    if (!cachedToolpath) {
        const downloadPath = await toolCache.downloadTool(downloadUrl(version));
        cachedToolpath = await toolCache.cacheFile(downloadPath, binaryName, binaryName, version)
    }

    core.addPath(cachedToolpath)
}

run().catch(core.setFailed);
