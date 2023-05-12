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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PersonIcon from '@mui/icons-material/Person';

export const FtySidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/faculty/Profile",
        fname:"",
    },
    {
        title:"Awards/Achievements",
        icon:<EmojiEventsIcon />,
        link:"/faculty/Awards",
        fname:"",
    },
    {
        title:"Lecture By Visiting Experts",
        icon:<PeopleIcon />,
        link:"/faculty/Seminars",
        fname:""
    },
      {
        title:"Invited Lectures By Faculty",
        icon:<PersonIcon  />,
        link:"/faculty/Achievements",
        fname:""
    },   
    {
        title:"Foreign Visits",
        icon:<AirplanemodeActiveOutlinedIcon />,
        link:"/faculty/foreign",
        fname:""
    },
    {
        title:"Publications/Patents/Journals",
        icon:<ImportContactsSharpIcon />,
        link:"/faculty/Publications",
        fname:""
    },
    {
        title:"Research Projects",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/faculty/Projects",
        fname:""
    },

    {
        title:"Combined Pdf",
        icon:<FileCopyIcon/>,
        link:"/faculty/Fac_Combined",
        fname:"/faculty/"
    },

    {
        title:"Approve students",
        icon:<VerifiedIcon/>,
        link:"/faculty/Approve",
        fname:"",
    },
]