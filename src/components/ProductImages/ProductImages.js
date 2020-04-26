import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react';

const ProductImages = ({ images }) => {
    const [largeImage, setLargeImage] = useState(""); 

    useEffect(() => {
        if (images.length !== 0) {
            const defaultLargeImage = images[0].largeImageUrl;
            setLargeImage(defaultLargeImage)
        }
    },[])

    if (images.length === 0) {
        return null;
    }

    return (
        <Fragment>
            <Grid>

                {largeImage === '' ? null :
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Segment compact>
                            <Image style={{ height: 200 }} src={largeImage} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>}

                <Grid.Row columns={5}>
                    
                    {
                        images.map((item,id) => (
                                <Image
                                    key={id}
                                    src={item.miniImageUrl}
                                    onClick={() => setLargeImage(item.largeImageUrl)}
                                    style={{ marginLeft: 20, width: 70, height: 40, cursor: "pointer" }} />
                        ))
                    }
                    
                </Grid.Row>

            </Grid>            
        </Fragment>
    )
};

export default ProductImages;