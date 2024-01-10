import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const TabMenu = ({ tabsData }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Tabs
                orientation="horizontal" // Change l'orientation en horizontal
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Horizontal tabs example"
                sx={{ borderBottom: 1, borderColor: 'divider' }} // Supprime le bord droit et ajuste les styles
            >
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            {tabsData.map((tabContent, index) => (
                <TabPanel key={index} value={selectedTab} index={index}>
                    {tabContent.content}
                </TabPanel>
            ))}
        </Box>
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`horizontal-tabpanel-${index}`}
            aria-labelledby={`horizontal-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default TabMenu;