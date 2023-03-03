import * as React from 'react';
import List from '@mui/material/List';
import {
    AppBar, Button,
    Container,
    Dialog,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText, TextField, Toolbar, Typography
} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const patients = [
    {
    Id: "1",
    Name: "小明",
    OrderId: "1",
    },
    {
        Id: "2",
        Name: "小華",
        OrderId: "2",
    },
    {
        Id: "3",
        Name: "小張",
        OrderId: "3",
    },
    {
        Id: "4",
        Name: "小李",
        OrderId: "4",
    },
    {
        Id: "5",
        Name: "小王",
        OrderId: "5",
    }
]

function CloseIcon() {
    return null;
}

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [orders, setOrder] = React.useState([]);
    React.useEffect(() => {
        fetch( 'http://localhost:3000/orders').then((response) => {
            return response.json();
        } ).then((data) => {
            setOrder(data)
            console.log(data);
        } )
    }, []);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleSave = (id,message) => {
        console.log(id===undefined);
        if(id===undefined){
            fetch( 'http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message: message}),
            }).then((response) => {
                return response.json();
            } ).then((data) => {
                setOrder([...orders, data])
                console.log(data);
            } )
            orders.pop();
        }else {
            fetch( 'http://localhost:3000/orders/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message: message}),
            }).then((response) => {
                return response.json();
            } ).then((data) => {
                console.log(data);
            } )
        }
    }

    const handleAdd = (value) => {
        setOrder([...orders, {Message: ""}]);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Orders
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleAdd}>
                        ADD
                    </Button>
                </Toolbar>
            </AppBar>
            <List sx={{ pt: 0 }}>
                {orders.map((order) => (
                    <ListItem disableGutters>
                        <ListItemButton  key={order._id}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Message"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={order.Message}
                                onChange={(e) => {
                                    order.Message = e.target.value;
                                    console.log(order.Message);
                                }}
                            />
                            <Button autoFocus color="inherit" onClick={(e) => handleSave(order._id,order.Message,e)}>
                                Save
                            </Button>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
const Home = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(1);
    const [patient, setPatient] = React.useState({});

    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedValue(id);
        console.log(id);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };


    fetch( 'http://localhost:3000/orders').then((response) => {
        return response.json();
    } ).then((data) => {
        //setOrder(data)
        console.log(data);
    })

   // const [searchParams, _] = useSearchParams();
    //const [category] = useState(searchParams.get('category')===null?'all':searchParams.get('category'));

    return (
        <>

            <Container maxWidth="sm">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItemText primary={`Id Name`} />
                    {patients.map((value) => (
                        <ListItem
                            key={value.Id}
                            disableGutters
                            secondaryAction={
                                <IconButton aria-label="comment" onClick={(e)=>handleClickOpen(value.Id,e)}>
                                    <CommentIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={`${value.Id} ${value.Name}`} />
                        </ListItem>
                    ))}
                </List>
            </Container>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </>
    )
}

export default Home;