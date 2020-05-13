/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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

import { ContainerModule } from 'inversify';
import { WidgetFactory, WidgetManager } from '@theia/core/lib/browser/widget-manager';
import {
    ViewContainer
} from '@theia/core/lib/browser';
import {
    EXPLORER_VIEW_CONTAINER_ID,
} from '@theia/navigator/lib/browser';
import { TimelineWidget } from './timeline-widget';
import { TimelineService } from './timeline-service';

export default new ContainerModule(bind => {
    bind(TimelineService).toSelf().inSingletonScope();
    bind(TimelineWidget).toSelf();
    // bind(TreeProps).toConstantValue(defaultTreeProps);
    // bind(TimelineTreeModel).toSelf().inSingletonScope();
    // bind(Tree).to(TreeImpl).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: TimelineWidget.ID,
        createWidget: async () => {
            const viewContainer = container.get<ViewContainer.Factory>(ViewContainer.Factory)({
                id: EXPLORER_VIEW_CONTAINER_ID,
                progressLocationId: 'explorer'
            });
            const widget = await container.get(WidgetManager).getOrCreateWidget(TimelineWidget.ID);
            viewContainer.addWidget(widget, {
                canHide: false,
                initiallyCollapsed: false
            });
            return widget;
        }
        // container.get(TimelineWidget)
    })).inSingletonScope();
    // bind(WidgetFactory).toDynamicValue(({ container }) => ({
    //     id: EXPLORER_VIEW_CONTAINER_ID,
    //     createWidget: async () => {
    //         const viewContainer = container.get<ViewContainer.Factory>(ViewContainer.Factory)({
    //             id: EXPLORER_VIEW_CONTAINER_ID,
    //             progressLocationId: 'explorer'
    //         });
    //         const widget = await container.get(WidgetManager).getOrCreateWidget(TimelineWidget.ID);
    //         viewContainer.addWidget(widget, {
    //             canHide: false,
    //             initiallyCollapsed: false
    //         });
    //         return viewContainer;
    //     }
    // }));
});
