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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { injectable } from 'inversify';
import { IFileService, IFileSystemProvider, IResolveMetadataFileOptions } from '../../common/files';
import { Disposable } from '@theia/core/src/common';
import { URI } from 'vscode-uri';
import { VSBuffer } from '../../common/buffer';

@injectable()
export class PluginFileService implements IFileService {

    registerProvider(scheme: string, provider: IFileSystemProvider): Disposable {
        throw new Error("Method not implemented.");
    }
    resolve(resource: URI, options: IResolveMetadataFileOptions): Promise<import("../../common/files").IFileStatWithMetadata>;
    resolve(resource: URI, options?: import("../../common/files").IResolveFileOptions | undefined): Promise<import("../../common/files").IFileStat>;
    resolve(resource: any, options?: any) {
        throw new Error("Method not implemented.");
    }
    readFile(resource: URI): Promise<import("../../common/files").IFileContent> {
        throw new Error("Method not implemented.");
    }
    writeFile(resource: URI, content: VSBuffer): Promise<import("../../common/files").IFileStatWithMetadata> {
        throw new Error("Method not implemented.");
    }
    move(source: URI, target: URI, overwrite?: boolean | undefined): Promise<import("../../common/files").IFileStatWithMetadata> {
        throw new Error("Method not implemented.");
    }
    copy(source: URI, target: URI, overwrite?: boolean | undefined): Promise<import("../../common/files").IFileStatWithMetadata> {
        throw new Error("Method not implemented.");
    }
    createFolder(resource: URI): Promise<import("../../common/files").IFileStatWithMetadata> {
        throw new Error("Method not implemented.");
    }
    del(resource: URI, options?: import("../../common/files").FileDeleteOptions | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
