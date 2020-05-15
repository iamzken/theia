/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { interfaces } from 'inversify';
import { Disposable, ResourceResolver, DisposableCollection } from '@theia/core';
import { Resource, ResourceProvider } from '@theia/core/lib/common/resource';
import URI from '@theia/core/lib/common/uri';

@injectable()
export class PluginResourceResolver implements ResourceResolver, Disposable {

    // resource providers by schemas
    private providers = new Map<string, FSResourceProvider>();
    private toDispose = new DisposableCollection();

    resolve(uri: URI): Resource {
        const provider = this.providers.get(uri.scheme);
        if (provider) {
            return provider.create(uri);
        }
        throw new Error(`Unable to find a Resource Provider for scheme '${uri.scheme}'`);
    }

    dispose(): void {
        this.toDispose.dispose();
    }

    registerResourceProvider(handle: number, scheme: string, proxy: FileSystemExt): Disposable {
        if (this.providers.has(scheme)) {
            throw new Error(`Resource Provider for scheme '${scheme}' is already registered`);
        }

        const provider = new FSResourceProvider(handle, proxy);
        this.providers.set(scheme, provider);

        const disposable = Disposable.create(() => {
            this.providers.delete(scheme);
        });
        this.toDispose.push(disposable);
        return disposable;
    }
}

class FSResourceProvider {

    constructor(private handle: number, private proxy: FileSystemExt) { }

    create(uri: URI): Resource {
        return new FSResource(this.handle, uri, this.proxy);
    }
}

/** Resource that delegates reading/saving a content to a plugin's FileSystemProvider. */
export class FSResource implements Resource {

    constructor(private handle: number, public uri: URI, private proxy: FileSystemExt) { }

    readContents(options?: { encoding?: string }): Promise<string> {
        return this.proxy.$readFile(this.handle, Uri.parse(this.uri.toString()), options);
    }

    saveContents(content: string, options?: { encoding?: string }): Promise<void> {
        return this.proxy.$writeFile(this.handle, Uri.parse(this.uri.toString()), content, options);
    }

    dispose(): void { }
}
