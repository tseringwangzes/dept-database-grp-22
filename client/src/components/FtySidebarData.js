import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import TourIcon from '@mui/icons-material/Tour';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarsIcon from '@mui/icons-material/Stars';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
export const FtySidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/faculty/Profile",
        fname:"",
    },
    {
        title:"Awards",
        icon:<EmojiEventsIcon />,
        link:"/faculty/Awards",
        fname:"",
    },
    {
        title:"Achievements",
        icon:<StarsIcon />,
        link:"/faculty/Achievements",
        fname:""
    },
    {
        title:"Workshops/Seminar Organised",
        icon:<PeopleIcon />,
        link:"/faculty/Seminars",
        fname:""
    },
    {
        title:"Foreign Visits",
        icon:<AirplanemodeActiveOutlinedIcon />,
        link:"/faculty/foreign",
        fname:""
    },
    {
        title:"Publications/Patents",
        icon:<ImportContactsSharpIcon />,
        link:"/faculty/Publications",
        fname:""
    },
    {
        title:"Project Grants",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/faculty/Projects",
        fname:""
    },
    {
        title:"Approve students",
        icon:<VerifiedIcon/>,
        link:"/faculty/Approve",
        fname:"",
    },
]