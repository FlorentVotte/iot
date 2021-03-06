/**
 * Created by Florent on 23/03/2020.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default  function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.votte.eu/">
                Florent Votte
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
