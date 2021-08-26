import * as React from "react";
import { useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MailIcon from "@material-ui/icons/Mail";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AuthenticationResult } from "@azure/msal-browser";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { getAuthResponse, logout } from "containers/AuthenticationProvider/AuthenticationHelper";
import LoadingScreen from "./LoadingScreen";

const AuthenticatedUserDetails: React.SFC = () => {
    const [atsResponse, setAtsResponse] = React.useState<AuthenticationResult | null>(null);
    useEffect(() => {
        async function fetchAccess() {
            if (!atsResponse) {
                const response = await getAuthResponse();
                setAtsResponse(response);
            }
        }
        fetchAccess();
    });
    return (
        <>
            {atsResponse !== null ? (
                <>
                    <button
                        onClick={async () => {
                            await logout();
                        }}
                    >
                        Logout
                    </button>
                    <List className="protectedData">
                        <NameListItem name={atsResponse.account?.name} />
                        <MailListItem mail={atsResponse.account?.username} />
                        <AccessTokenExpiresListItem expiresOn={atsResponse.expiresOn} />
                        <ScopesListItem scopes={atsResponse.scopes} />
                    </List>
                </>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
};

const NameListItem = ({ name }: { name: string | undefined }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <PersonIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={name} />
    </ListItem>
);

const AccessTokenExpiresListItem = ({ expiresOn }: { expiresOn: Date | null }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <ScheduleIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Access Token Expires At" secondary={expiresOn?.toString()} />
    </ListItem>
);

const MailListItem = ({ mail }: { mail: string | undefined }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <MailIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Username" secondary={mail} />
    </ListItem>
);

const ScopesListItem = ({ scopes }: { scopes: string[] }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <LockOpenIcon />
            </Avatar>
        </ListItemAvatar>
        <List>
            {scopes.map((scope, index) =>
                index === 0 ? <ListItemText primary="Scopes" secondary={scope} key={scope} /> : <ListItemText secondary={scope} />
            )}
        </List>
    </ListItem>
);

export default AuthenticatedUserDetails;
