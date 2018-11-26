import { DrawerNavigator , createStackNavigator } from 'react-navigation';

import Settings from '../scenes/Settings';
import Home from '../scenes/Home';
import SideMenu from './side-menu';
import CustomHeader from '../container/header';
import Category from '../scenes/Category/index';
import CategoryForm from '../scenes/Category/components/category-form';

const stackApp = createStackNavigator({
    HomeScreen:{  screen: Home },
    CategoryScreen:{  screen: Category },
    CategoryFormScreen:{  screen: CategoryForm },
    CustomHeaderScreen:{  screen: CustomHeader },
},{
    initialRouteName: 'HomeScreen',
})

const stackSettings = createStackNavigator({
    SettingsScreen:{  screen: Settings },
})

export const Nav = DrawerNavigator({
    AppScreen:{  screen: stackApp },
    SettingsScreen:{  screen: stackSettings },
},{
    contentComponent: SideMenu
});