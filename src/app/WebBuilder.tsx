import Layout from "../asstes/icons/layout.tsx";
import Section from "../asstes/icons/section.tsx";
import Grid from "../asstes/icons/grid.tsx";

const WebBuilder = () => {


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
                        <li data-tooltip="레이아웃"> <Layout style={{width:'24px'}}/> </li>
                        <li data-tooltip="그리드"> <Grid style={{width:'24px'}}/> </li>
                        <li data-tooltip="섹션"> <Section style={{width:'24px'}}/> </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default WebBuilder