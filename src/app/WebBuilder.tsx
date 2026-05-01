import { useCallback, useState } from "react";
import WbMenu from "./components/WbMenu.tsx";
import Nav from "./components/Nav.tsx";
import Content from "./components/Content.tsx";
import type { MenuData } from "./types/MenuData.ts";
import type { Grid, PageLayoutContainer, PageLayoutType } from "./types/PageLayout.ts";
import { stringifyPageLayout } from "./types/PageLayout.ts";
import type { PageLayoutPayload } from "./utils/pageLayoutApi.ts";

const axisAuto = { x: "auto", y: "auto" } as const;

function gridOf(id: number, sections: Grid["sections"]): Grid {
    return { id, sections, axis: axisAuto };
}

function doc(layout: PageLayoutType, grids: Grid[]): PageLayoutContainer {
    return { layout, grids };
}

const MENU_DUMMY_DATA: MenuData = {
    menus: [
        {
            id: 101,
            name: "사이트 페이지",
            childre: [
                {
                    id: 1,
                    name: "Home",
                    childre: [],
                },
                {
                    id: 2,
                    name: "About Us",
                    childre: [],
                },
                {
                    id: 3,
                    name: "Blog",
                    childre: [],
                },
                {
                    id: 4,
                    name: "Contact Us",
                    childre: [],
                },
            ],
        },
        {
            id: 102,
            name: "예약 페이지",
            childre: [
                {
                    id: 11,
                    name: "내 예약",
                    childre: [],
                },
                {
                    id: 12,
                    name: "My Wallet",
                    childre: [],
                },
                {
                    id: 13,
                    name: "Book Online",
                    childre: [],
                },
                {
                    id: 14,
                    name: "Staff Members",
                    childre: [],
                },
                {
                    id: 15,
                    name: "예약 캘린더",
                    childre: [],
                },
            ],
        },
        {
            id: 103,
            name: "회원 페이지",
            childre: [
                {
                    id: 21,
                    name: "내 계정",
                    childre: [],
                },
            ],
        },
    ],
};

const MENU_LAYOUT_DOC_BY_ID: Record<number, PageLayoutContainer> = {
    1: doc("normal", [
        gridOf(1001, [
            {
                elements: [{ isFullWidth: true, component: { type: "other", key: "hero.title" } }],
            },
        ]),
    ]),
    2: doc("narrow", [
        gridOf(2001, [
            {
                elements: [{ isFullWidth: false, component: { type: "object", key: "about.profile" } }],
            },
        ]),
    ]),
    3: doc("2way", [
        gridOf(3001, [
            {
                elements: [{ isFullWidth: false, component: { type: "other", key: "blog.list" } }],
            },
        ]),
    ]),
    4: doc("3way", [
        gridOf(4001, [
            {
                elements: [{ isFullWidth: true, component: { type: "input", key: "contact.form" } }],
            },
        ]),
    ]),
    11: doc("normal", [
        gridOf(11001, [
            {
                elements: [{ isFullWidth: true, component: { type: "other", key: "booking.table" } }],
            },
        ]),
    ]),
    12: doc("narrow", [
        gridOf(12001, [
            {
                elements: [{ isFullWidth: false, component: { type: "object", key: "wallet.summary" } }],
            },
        ]),
    ]),
    13: doc("2way", [
        gridOf(13001, [
            {
                elements: [
                    { isFullWidth: true, component: { type: "date", key: "booking.pickDate" } },
                    { isFullWidth: true, component: { type: "input", key: "booking.notes" } },
                ],
            },
        ]),
    ]),
    14: doc("3way", [
        gridOf(14001, [
            {
                elements: [{ isFullWidth: false, component: { type: "object", key: "staff.cards" } }],
            },
        ]),
    ]),
    15: doc("crown", [
        gridOf(15001, [
            {
                elements: [{ isFullWidth: true, component: { type: "other", key: "calendar.month" } }],
            },
        ]),
    ]),
    21: doc("normal", [
        gridOf(21001, [
            {
                elements: [
                    { isFullWidth: false, component: { type: "object", key: "account.header" } },
                    { isFullWidth: true, component: { type: "input", key: "account.email" } },
                    { isFullWidth: true, component: { type: "date", key: "account.birthday" } },
                ],
            },
        ]),
    ]),
};

async function fetchPageLayoutById(pageId: number): Promise<PageLayoutPayload> {
    await new Promise((r) => setTimeout(r, 450));
    const found = MENU_LAYOUT_DOC_BY_ID[pageId];
    if (!found) {
        throw new Error(`알 수 없는 페이지 id: ${pageId}`);
    }
    return stringifyPageLayout(found);
}

const WebBuilder = () => {
    const [closePageSelectNonce, setClosePageSelectNonce] = useState(0);
    const [closeDrawerNonce, setCloseDrawerNonce] = useState(0);

    const onPageSelectOpenIntent = useCallback(() => {
        setCloseDrawerNonce((n) => n + 1);
    }, []);

    const onDrawerOpenIntent = useCallback(() => {
        setClosePageSelectNonce((n) => n + 1);
    }, []);

    return (
        <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
            <Nav
                data={MENU_DUMMY_DATA}
                defaultSelectedId={1}
                fetchPageLayout={fetchPageLayoutById}
                closePageSelectNonce={closePageSelectNonce}
                onOpenIntent={onPageSelectOpenIntent}
            />

            <div className={`wb-body`}>
                <WbMenu closeNonce={closeDrawerNonce} onOpenIntent={onDrawerOpenIntent} />
                <Content />
            </div>
        </div>
    )
}

export default WebBuilder