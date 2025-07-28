from typing import Any
from pydantic import BaseModel, HttpUrl


class AffiliateLink(BaseModel):
    platform: str
    # link: HttpUrl
    link: str
    price: float


class allProductsTypes(BaseModel):
    # image: HttpUrl
    image: str
    category: str
    subCategory: list[str]
    affiliateLinks: list[AffiliateLink] | None = None
    name: str
    brand: str
    description: str
    tags: list[str]
    price: float | None = None
    # affiliateLink: HttpUrl | None
    affiliateLink: str | None = None
    id: str | None = None


_productsarr_data: list[dict[str, Any]] = [
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748491527/gow_4_lxvzrp.png",
        "category": "games",
        "subCategory": ["video game"],
        "affiliateLinks": [
            {"platform": "amazon", "link": "https://amzn.to/3TFPnU8", "price": 799}
        ],
        "name": "God of War 4",
        "brand": "Santa Monica Studio",
        "description": "GOD OF WAR 4 | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["gow", "gow4"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748491527/gow_4_lxvzrp.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 799.0,
        "affiliateLink": "https://amzn.to/3TFPnU8",
        "name": "God of War 4",
        "id": "a851d136-71cf-4e72-88dc-ce15bb5fc764",
        "brand": "Santa Monica Studio",
        "description": "GOD OF WAR 4 | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["gow", "gow4"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748491208/lou_part_1_bgwq1f.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 799.0,
        "affiliateLink": "https://amzn.to/44e0MQ2",
        "name": "Last of Us, Part 1",
        "id": "0b2ddbc8-7e58-4343-a53c-00cf7d678619",
        "brand": "Naughty Dog",
        "description": "The Last of US Part I | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC/LAPTOP GAME) ",
        "tags": ["lou", "lou1"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748577562/re_4_pzqifk.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 399.0,
        "affiliateLink": "https://amzn.to/3GfPnHo",
        "name": "Resident Evil 4",
        "id": "5eabed52-edce-4c39-930d-b81ea67b0349",
        "brand": "Capcom",
        "description": "RESEDENT EVIL 4 | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["re", "re4"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1749193437/uc_4_owo10p.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 999.0,
        "affiliateLink": "https://karan.email/affiliates/product-not-available",
        "name": "Uncharted 4",
        "id": "bf80016c-eb7e-4c17-8062-84b6cb185fcc",
        "brand": "Naughty Dog",
        "description": "UNCHARTED 4 | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["uc", "uc4"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748505650/rdr_1_kqja3p.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 799.0,
        "affiliateLink": "https://karan.email/affiliates/product-not-available",
        "name": "Red Dead Redemption 1",
        "id": "29af6a53-11b2-49a4-b3dc-12cfe9d2e2a9",
        "brand": "Rockstar Games",
        "description": "RED DEAD REDEMPTION | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["rdr", "rdr1"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1748508927/Assassin_s_Creed_Odyssey_j5dicm.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 599.0,
        "affiliateLink": "https://amzn.to/4na77Vv",
        "name": "Asassins Creed Odyssey",
        "id": "ea23efe4-1c0f-4936-ab31-704c90381f02",
        "brand": "UbiSoft",
        "description": "ASASSINS CREED ODYSSEY | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["ac", "aco"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1750670112/fr5_blkuhu.png",
        "category": "games",
        "subCategory": ["video game"],
        "price": 599.0,
        "affiliateLink": "https://amzn.to/44esrAz",
        "name": "Far Cry 5",
        "id": "6b8742f6-9f5c-41dc-88e2-a2970a8a64d7",
        "brand": "UbiSoft",
        "description": "FAR CRY 5 | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["fc", "fc5"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1750670960/m_siperman_r_u90ti6.jpg",
        "category": "games",
        "subCategory": ["video game"],
        "price": 1999.0,
        "affiliateLink": "https://karan.email/affiliates/product-not-available",
        "name": "Marvel's Spider-Man Remastered",
        "id": "d8d6dc8f-cdbc-4322-b9ea-d30931aaaedd",
        "brand": "Insomniac Games",
        "description": "MARVEL'S SPIDERMAN REMASTERED | PC GAME | 𝐈𝐍𝐒𝐓𝐀𝐍𝐓 𝐄-𝐌𝐀𝐈𝐋 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐘 (PC) ",
        "tags": ["spiderman", "spiderman remastered", "sm"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1749266114/power_48_law_dhtbha.png",
        "category": "books",
        "subCategory": ["book"],
        "price": 588.0,
        "affiliateLink": "https://amzn.to/44sGSCe",
        "name": "Power",
        "id": "663b4cb1-c19e-4a44-a44c-2982bd7b3298",
        "brand": "Robert Greene",
        "description": "Drawn from 3,000 years of the history of power, this is the definitive guide to help readers achieve for themselves what Queen Elizabeth I, Henry Kissinger, Louis XIV and Machiavelli learnt the hard way. ",
        "tags": ["power book"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1749267919/twm_book_dst97n.png",
        "category": "books",
        "subCategory": ["book"],
        "price": 208.0,
        "affiliateLink": "https://amzn.in/d/igVdKbo",
        "name": "Tuesdays With Morrie",
        "id": "0af94490-29d1-4403-9f17-ea4d87d1eaab",
        "brand": "Mitch Albom",
        "description": "TUESDAYS WITH MORRIE is a magical chronicle of their time together, through which Mitch shares Morrie's lasting gift with the world. ",
        "tags": ["Tuesdays With Morrie", "twm"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1749267179/tsaongaf_book_ggwuoe.png",
        "category": "books",
        "subCategory": ["book"],
        "price": 339.0,
        "affiliateLink": "https://amzn.to/3FZUE63",
        "name": "The Subtle Art Of Not Giving A F*ck",
        "id": "5c5f49e3-dd84-482b-a42a-78a0d9f4ba66",
        "brand": "Mark Manson",
        "description": "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time so that we can truly become better, happier people. The Subtle Art of Not Giving a F**k is a refreshing slap for a generation to help them truly lead contented, grounded lives. ",
        "tags": ["tsaongaf"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1750672752/rdpd_dszryw.png",
        "category": "books",
        "subCategory": ["book"],
        "price": 374.0,
        "affiliateLink": "https://amzn.in/d/aCmQaMi",
        "name": "Rich Dad Poor Dad",
        "id": "1e54fbf1-abd7-46e7-bb76-08f4790d1396",
        "brand": "Robert T. Kiyosaki",
        "description": "Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you. ",
        "tags": ["rdpd"],
    },
    {
        "image": "https://res.cloudinary.com/dywuvwqth/image/upload/v1749275618/tagr_book2_eelkpg.png",
        "category": "books",
        "subCategory": ["book"],
        "price": 183.0,
        "affiliateLink": "https://amzn.to/43JKxdf",
        "name": "Think and Grow Rich",
        "id": "8394060c-b794-42f4-b681-d0d9955bacfd",
        "brand": "Napoleon Hill",
        "description": "Think and Grow Rich by Napoleon Hill is a classic self-help book that teaches success comes from cultivating a burning desire, unwavering faith, and a clear plan, with the power of thought and action at its core. It outlines practical steps and mindset shifts needed to achieve wealth and fulfillment in every aspect of life. ",
        "tags": ["Think and Grow Rich"],
    },
]

# Validate and convert each dict to allProductsTypes instance
allProductsArr: list[allProductsTypes] = [
    allProductsTypes(**item) for item in _productsarr_data
]
