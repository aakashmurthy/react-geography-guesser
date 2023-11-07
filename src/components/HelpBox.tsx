import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function HelpBox() {
    return (
    <Tabs>
    <TabList>
      <Tab>Background</Tab>
      <Tab>StreetView</Tab>
      <Tab>Guessing</Tab>
      <Tab>Scoring</Tab>
      <Tab>Need Help?</Tab>
    </TabList>

    <TabPanel>
      <h3>What is Geography Guesser?</h3>
      <p>Geography Guesser is a simple game, where you are placed somewhere in the world, at random, with a goal to pinpoint your starting location on the provided map.</p>
    </TabPanel>
    <TabPanel>
      <p>To navigate, simply use the provided arrows on the StreetView window, or click on the road to move your viewer to that point.</p>
    </TabPanel>
    <TabPanel>
      <p>Make your guess on the map below the viewer, and submit using the button.</p>
    </TabPanel>
    <TabPanel>
      <p>A guess closer to your starting position will result in a higher score.</p>
    </TabPanel>
    <TabPanel>
      <p>If you need hints, use our AI assistant below. It will automatically read your street viewer and give you a suitable hint.</p>
      <p>[Implementation Pending]</p>
    </TabPanel>
  </Tabs>
    )
}