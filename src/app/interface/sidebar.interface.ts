
// Main interface used by the sidebar.
export interface SlothSidebarItem {
    id: number | null;
    type: 'link' | 'header' | 'text' | 'section' | null;
    text: string | null;
    icon: string | null;
    link: string | null;
    color: string | null;
    badge: string | null;
    active: boolean | null;
    children: SlothSidebarItem[] | null;
}

export interface SlothSidebar {
    type: 'small' | 'full-size' | 'hidden',
    title?: string
    children: SlothSidebarItem[]
}
