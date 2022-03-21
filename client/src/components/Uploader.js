import { Component } from "react";
import { AddPhotoAlternate, Upload, Close } from "@mui/icons-material";
import {
    Fab,
    Fade,
    Grid,
    Card,
    ClickAwayListener,
    Typography,
} from "@mui/material";

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transition: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
            transition: true,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // append file to FormData that is on state
        // send data to server
        // if success: update profilePic property from the state App via method passed down in props (updateProfilePic)
        const fd = new FormData();
        fd.append("file", this.state.profilePic);

        fetch("/profile-pic.json", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((data) => {
                // updating profilePic in App state with only the pic URL:
                this.props.updateProfilePic(data.profilePic);
                this.props.toggleUploader();
            })
            .catch((err) =>
                console.log("error uploading profile picture", err)
            );
    }

    render() {
        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <ClickAwayListener onClickAway={this.props.toggleUploader}>
                    <Card
                        sx={{
                            width: 1 / 4,
                            p: 2,
                        }}
                    >
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={11} sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    Add your profile picture here:
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Close
                                    className="close-icon"
                                    onClick={this.props.toggleUploader}
                                />
                            </Grid>
                            <Grid item>
                                <form>
                                    {!this.state.profilePic ? (
                                        <Fab
                                            variant="contained"
                                            color="primary"
                                            component="label"
                                        >
                                            <AddPhotoAlternate />
                                            <input
                                                type="file"
                                                hidden
                                                name="profilePic"
                                                onChange={(e) =>
                                                    this.handleChange(e)
                                                }
                                            />
                                        </Fab>
                                    ) : (
                                        <Fade
                                            in={this.state.transition}
                                            style={{
                                                transformOrigin: "left center",
                                            }}
                                            {...{ timeout: 1000 }}
                                        >
                                            <Fab
                                                variant="extended"
                                                color="primary"
                                                onClick={(e) =>
                                                    this.handleSubmit(e)
                                                }
                                            >
                                                <Upload />
                                                <div
                                                    style={{
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        maxWidth: "180px",
                                                    }}
                                                >
                                                    <Typography
                                                        noWrap
                                                        variant="body2"
                                                    >
                                                        {
                                                            this.state
                                                                .profilePic.name
                                                        }
                                                    </Typography>
                                                </div>
                                            </Fab>
                                        </Fade>
                                    )}
                                </form>
                            </Grid>
                        </Grid>
                    </Card>
                </ClickAwayListener>
            </Grid>
        );
    }
}

export default Uploader;
