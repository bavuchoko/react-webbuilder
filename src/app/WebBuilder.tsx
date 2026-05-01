import WbMenu from "./components/WbMenu.tsx";

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
                <WbMenu />
                <div className={`wb-content`}>sef</div>
            </div>
        </div>
    )
}

export default WebBuilder