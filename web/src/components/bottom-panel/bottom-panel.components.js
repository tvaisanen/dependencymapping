import React from 'react';
import * as s from './bottom-panel.styled';

export const PanelNavTabs = ({selectedView, tabItems, setView}) => (
    <s.PanelNavigation>
        <div>
            {
                tabItems.map((tab,i) => (
                    <s.PanelNavTab
                        key={i}
                        selected={selectedView === tab.viewId}
                        onClick={() => setView(tab.viewId)}
                        largePadding
                    >{tab.label}
                    </s.PanelNavTab>
                ))
            }
        </div>
    </s.PanelNavigation>
);