import { MainContentCC, MainContentSC } from "../../types/types";
import { adaptComedianToClientCard } from "./comedian-adapters";
import { adaptServerEventToClientCard } from "./event-adapters";
import { adaptServerPlaceToClientCard } from "./place-adapters";
import { adaptServerShowToClientCard } from "./show-adapters";



export const adaptMainContent = (data: MainContentSC): MainContentCC => ({
    shows: data.shows.map(adaptServerShowToClientCard),
    comedians: data.comedians.map(adaptComedianToClientCard),
    eventsByDate: data.eventsByDate.map(adaptServerEventToClientCard),
    eventsByViews: data.eventsByViews.map(adaptServerEventToClientCard),
    places: data.places.map(adaptServerPlaceToClientCard),
})
