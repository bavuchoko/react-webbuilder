import Layout from "../asstes/icons/layout.tsx";
import Section from "../asstes/icons/section.tsx";
import Grid from "../asstes/icons/grid.tsx";
import {useMemo, useState} from "react";
import Drawer from "./components/Drawer.tsx";
import LayoutDrawerContent from "./drawers/LayoutDrawerContent.tsx";
import GridDrawerContent from "./drawers/GridDrawerContent.tsx";
import SectionDrawerContent from "./drawers/SectionDrawerContent.tsx";

type DrawerKey = 'layout' | 'grid' | 'section' | null;

const WebBuilder = () => {
    const [activeDrawer, setActiveDrawer] = useState<DrawerKey>(null);

    const drawerWidth = useMemo(() => {
        switch (activeDrawer) {
            case 'layout':
                return 360;
            case 'grid':
                return 460;
            case 'section':
                return 320;
            default:
                return 360;
        }
    }, [activeDrawer]);

    const toggleDrawer = (key: Exclude<DrawerKey, null>) => {
        setActiveDrawer((prev) => (prev === key ? null : key));
    };

    const drawerTitle = useMemo(() => {
        if (activeDrawer === 'layout') return '레이아웃';
        if (activeDrawer === 'grid') return '그리드';
        if (activeDrawer === 'section') return '섹션';
        return '';
    }, [activeDrawer]);

    const drawerAccentColor = useMemo(() => {
        if (activeDrawer === 'layout') return '#2563eb'; // blue
        if (activeDrawer === 'grid') return '#7c3aed';   // violet
        if (activeDrawer === 'section') return '#fc9d3c'; // green
        return 'transparent';
    }, [activeDrawer]);

    const drawerContent = useMemo(() => {
        if (activeDrawer === 'layout') return <LayoutDrawerContent/>;
        if (activeDrawer === 'grid') return <GridDrawerContent/>;
        if (activeDrawer === 'section') return <SectionDrawerContent/>;
        return null;
    }, [activeDrawer]);

    return (
        <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
            <div className={`wb-nav-bar`}>
                <div className={`wb-nav-top`}>
                    <span className={`wb-logo`}>WB</span>
                </div>
                <div className={`wb-nav-bottom`}></div>
            </div>


            <div className={`wb-body`}>
                <div className={`wb-menu`}>
                    <ul>
                        <li
                            data-tooltip="레이아웃"
                            className={activeDrawer === 'layout' ? 'is-active' : undefined}
                            onClick={() => toggleDrawer('layout')}
                        >
                            <Layout style={{width:'24px'}}/>
                        </li>
                        <li
                            data-tooltip="그리드"
                            className={activeDrawer === 'grid' ? 'is-active' : undefined}
                            onClick={() => toggleDrawer('grid')}
                        >
                            <Grid style={{width:'24px'}}/>
                        </li>
                        <li
                            data-tooltip="섹션"
                            className={activeDrawer === 'section' ? 'is-active' : undefined}
                            onClick={() => toggleDrawer('section')}
                        >
                            <Section style={{width:'24px'}}/>
                        </li>
                    </ul>
                </div>

                <Drawer
                    open={!!activeDrawer}
                    width={drawerWidth}
                    title={drawerTitle}
                    accentColor={drawerAccentColor}
                    onClose={() => setActiveDrawer(null)}
                >
                    {drawerContent}
                </Drawer>
            </div>
        </div>
    )
}

export default WebBuilder