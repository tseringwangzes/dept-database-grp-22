import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import TourIcon from '@mui/icons-material/Tour';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import Groups2Icon from '@mui/icons-material/Groups2';
import FileCopyIcon from '@mui/icons-material/FileCopy';
// import EditNoteIcon from '@mui/icons-material/EditNote';
export const SidebarData = [
    {
        title:"BOG Meeting Data",
        icon:<FileCopyIcon/>,
        link:"/StaffHome"
    },
    {
        title:"Department Information",
        icon:<FontAwesomeIcon icon={faHome} />,
        link:"StaffHome/StaffDeptInfo"
    },
    {
        title:"Awards/Achievements",
        icon:<EmojiEventsIcon />,
        link:"/StaffHome/StaffStudent"
    },
    {
        title:"Foreign Visits",
        icon:<TourIcon />,
        link:"/StaffHome/StaffForeign"
    },
    {
        title:"Lectures/Workshops",
        icon:<Groups2Icon />,
        link:"/StaffHome/StaffSeminar"
    },
    {
        title:"Publications/Patents/Journals",
        icon:<ImportContactsSharpIcon />,
        link:"/StaffHome/StaffPublications"
    },
    {
        title:"Research Projects",
        icon:<CurrencyExchangeSharpIcon />,
        link:"/StaffHome/StaffProject"
    },
    {
        title:"Send Reminders",
        icon:<FontAwesomeIcon icon={faEnvelope} />,
        link:"/StaffHome/StaffReminder"
    }
]