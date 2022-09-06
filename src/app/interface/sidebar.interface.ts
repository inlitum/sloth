
// Main interface used by the sidebar.
export interface SlothSidebarItem {
    id: string;
    type: 'link' | 'header' | 'text' | 'section';
    text: string;
    icon?: string;
    link?: string;
    color?: string;
    badge?: string;
    active?: boolean;
    children?: SlothSidebarItem[];
}

export interface SlothSidebar {
    type: 'small' | 'full-size',
    title?: string
    children: SlothSidebarItem[]
}
