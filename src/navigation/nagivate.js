import { DrawerNavigator , createStackNavigator } from 'react-navigation';

import Settings from '../scenes/Settings';
import Home from '../scenes/Home';
import SideMenu from './side-menu';
import CustomHeader from '../container/header';
import Category from '../scenes/Category/index';
import CategoryDetail from '../scenes/CategoryDetail';

const stackApp = createStackNavigator({
    CategoryScreen:{  screen: Category },
    CategoryDetailScreen:{  screen: CategoryDetail },
})

const stackSettings = createStackNavigator({
    SettingsScreen:{  screen: Settings },
})

export const Nav = DrawerNavigator({
    AppScreen:{  screen: stackApp },
    HomeScreen:{  screen: Home },
    CustomHeaderScreen:{  screen: CustomHeader },
    SettingsScreen:{  screen: stackSettings },
    
},{
    contentComponent: SideMenu
});