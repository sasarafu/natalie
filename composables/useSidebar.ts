type SidebarState = {
  open: boolean;
  component: 'compose' | 'account';
};

export const useSidebar = () => {
  const sidebar = useState<SidebarState>('sidebarState', () => ({
    open: false,
    component: 'compose',
  }));

  return { sidebar };
};
