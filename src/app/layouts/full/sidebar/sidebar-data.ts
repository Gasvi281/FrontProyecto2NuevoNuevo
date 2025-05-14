import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Inicio',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Productos',
    iconName: 'solar:rolling-pin-bold',
    route: '/productos'
  },
  {
    displayName: 'Recetas',
    iconName: 'solar:chef-hat-bold',
    route: '/recetas'
  },
  {
    displayName: 'Lista',
    iconName: 'solar:checklist-bold',
    route: '/lista'
  },
  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },

  
];
