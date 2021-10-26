import { Box, Paper, Typography } from "@mui/material";

const About = () => {
    return <Box sx={{alignSelf:'center', m:"auto", lineHeight: 1.5, width: {
        sm: 345,
        md: 800
      }}} >
            <Paper sx={{mt:{sm:1, md:2, lg:3}, p:{sm:1, md:2, lg:3}}}>
                <Typography align="justify"><strong>Scoop-a-task</strong> is a productivity application. Its purpose is to help staying on top of <q>To-Do</q> tasks on the <q>Home</q> front - personal, household and family. 
                While our workplaces implement many workflows to make sure we are focused what needs to be done the home and family projects often get accomplished without any particular system.
                In the daily routine of taking care of the necessities some plans might remain just a thought that crossing the mind time to time but without chances to materialize. Providing visiblity into such
                tasks and projects is what Scoop-a-task attemps to solve.</Typography>                
            </Paper>
            <Paper sx={{mt:{sm:2, md:3, lg:4}, p:{sm:1, md:2, lg:3}}}>
                    <Typography variant="h6">What makes <strong>Scoop-a-task</strong> different fron many other To-Do List applicatins?</Typography>
                    <Typography align="justify">The approach is based on the parallels drawn between visiting an ice-cream parlour and managing a <q>To-Do</q> list. 
                    So what do they have in common?</Typography>
                    <Typography align="justify"><strong>All the current<q>inventory</q> is visible at once.</strong> 
                        It would be unusual for an ice cream store to hide any available flavours from the customer
                        Similarly for the <q>To-Do</q> list, if there is a backlog item hidden out of sight what is
                         the probability it will ever get completed?
                    </Typography>
                    <Typography align="justify"><strong><q>Flavours/Tasks</q> are organized in buckets</strong>
                        In an ice-cream place some buckets are filled to the top while others might be close to being empty. 
                        The tasks buckets are similar. Let us say there is a renovation in a house and corresponding bucket
                         has many <q>tasks</q>. While another bucket dealing with Taxes might be empty untill the next 
                         tax season.
                        </Typography>
                    <Typography align="justify"><strong>Match the portion to the "appetite"</strong>. The portion one orders in an ice-cream place can vary in size and variety of flavour
                        and would depend on the mood, appetite and budget. Deciding what can be accomplished in a day is very much similar. This becomes
                        <q>Daily Scoop</q> and just like an ice cream portion doesn't always gets consumed entirely the tasks choosen for the day might
                        not be accomplished after all. 
                    </Typography>                    
            </Paper>
    </Box>
}
export default About;