import React from "react";
import {
  Container,
  Segment,
  Header,
  List,
  Input,
  Grid,
  Divider,
  Button,
  Table,
} from "semantic-ui-react";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Zmap from '../../components/Zmap/Zmap';

const DeliveryOrder = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const DeliverySchema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    extraPhone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    street: Yup.string()
      .required('Required')
  });

  return (
      <Segment padded='very' color='violet' style={{ margin: 20 }}>
        <Header content='Доставка' textAlign='center' />
        <Divider />
        <QuantityProduct />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
                <Formik
                    initialValues={{
                      name: '',
                      phone: '',
                      extraPhone: '',
                      street: ''
                    }}
                    validationSchema={DeliverySchema}
                    onSubmit={(values) => {
                      // same shape as initial values
                    }}
                >
                    {({ 
                         values,
                         handleChange,
                         handleBlur,
                         handleSubmit
                         /* and other goodies */
                    }) => (
                      <Form>
                      <Table>
                      <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Input 
                                name='name'
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                placeholder="Имя" 
                                fluid
                                value={values.name} />
                                <ErrorMessage name="name" />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                          <Table.Cell>
                            <Input 
                              name='phone' 
                              onChange={handleChange} 
                              onBlur={handleBlur}
                              type='number'
                              placeholder="Телефон" 
                              fluid
                              value={values.phone}
                            />
                            <ErrorMessage name="phone" />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Input 
                              name='extraPhone' 
                              onChange={handleChange} 
                              onBlur={handleBlur}
                              type='number'
                              placeholder="Дополнительный телефон" 
                              fluid
                              value={values.extraPhone}
                            />
                            <ErrorMessage name="extraPhone" />
                          </Table.Cell>
                        </Table.Row>
      
                        <Table.Row>
                          <Table.Cell>
                            <Input 
                              name='street' 
                              onChange={handleChange} 
                              onBlur={handleBlur} 
                              placeholder="Улица" 
                              fluid
                              value={values.street}
                            />
                            <ErrorMessage name="street" />
                          </Table.Cell>
                        </Table.Row>
                        </Table.Body>

                      </Table>
                      <OrderPrice notShowButton={true} />
                      <Divider />
                      <Button color='violet' type="submit" onClick={handleSubmit}>Оформить</Button>
                      </Form>
                    )}
                    </Formik>

            </Grid.Column>
            <Grid.Column>
              <Zmap />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </Segment>
  );
};

export default DeliveryOrder;
