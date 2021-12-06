import { InfoOutlined } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => createStyles({
    greyBackground: {
            backgroundColor: "#999999"
        }
}));

const Agreement = () => {
    const classes = useStyles();

    return <>
    <Typography variant="h3">Terms of Use Agreement and Privacy Policy.</Typography>

<Typography paragraph={true}>In this scope of agreement,  “Application” refers to the Scoop-a-task website and the functionality it provides. 
    “We, Us, Our” refer to the party providing the Application, "You, Your, They, Their" refer to the users of the Application. 
</Typography>
<Typography paragraph={true}>
BY USING THE APPLICATION, YOU ACKNOWLEDGE THAT: YOU HAVE READ, UNDERSTOOD, AND ACCEPTED THE TERMS AND CONDITIONS OF THIS AGREEMENT.
</Typography>
<Typography variant="h6">Work in progress disclaimer</Typography>
<Typography paragraph={true}>
The Application accompanying this Agreement is a work in progress, its functionality is not finalized or fully tested. We may add, remove or modify any functionality at any time without obligations to notify you. We may cease providing the Application at any time. We shall not be obligated to release a final product.
</Typography>

<Typography variant="h6">Valid Use</Typography>
<Typography paragraph={true}>
You are allowed to access the application with the sole purpose of evaluating its features for personal and non-commercial use.
</Typography>

<Typography variant="h6">Intellectual Property</Typography>
<Typography paragraph={true}>The name of the application, its concept and any other information found on the website are copyrighted and protected by the Copyright law of Canad and international treaty provisions.</Typography>

<Typography variant="h6">Access Requirements</Typography>
<Typography paragraph={true}>In order to make use of the Application features you must sign-in with a Google account and allow the Application to manage its own configuration in your Google drive.
You acknowledge and agree that by granting such access the application will become connected to your Google Drive with the abilities of reading and writing its own data to its own dedicated space known as the <a href="https://developers.google.com/drive/api/v3/appdata#what_is_the_application_data_folder" target="_blank" rel="noreferrer">Application Data Folder</a>.
<Paper sx={{mt:1, backgroundColor:'#BBBBBB'}} className={classes.greyBackground} >
    <Box alignItems="center" display="flex">
        <InfoOutlined sx={{m:1}}/>
        <Typography paragraph={false}><a href="https://support.google.com/accounts/answer/3466521">Managing third-party apps &#38; services with access to your Google account</a></Typography>
    </Box>
</Paper>
</Typography>



<Typography variant="h6">Privacy Policy</Typography>
<Typography paragraph={true}>You acknowledge and agree that by signing in with Google account to the Application your primary Google email address will be shared with the Application. It will be saved and used to identify you as the user of the Application.</Typography>

<Typography paragraph={true}><strong>IN NO EVENT SHALL WE BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION, LOSS OF INFORMATION) ARISING OUT OF THE USE OF OR INABILITY TO USE THE APPLICATION, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong>
</Typography>
</>
}

export default Agreement;