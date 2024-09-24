import { Home, StepBack, StepForward, Video, Box } from "lucide-react"
export const SIDE_BAR_ITEMS = [
    {
        label: "Home",
        route: "/",
        icon: Home
    },
    {
        label: "Upcoming",
        route: "/upcoming",
        icon: StepForward
    },
    {
        label: "Previous",
        route: "/previous",
        icon: StepBack
    },
    {
        label: "Recordings",
        route: "/recordings",
        icon: Video
    },
    {
        label: "Personal Room",
        route: "/personal-room",
        icon: Box
    },
]