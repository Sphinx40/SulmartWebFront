const defineOrderStatus = (order,text) => {
    if (text === 'new') {
        if (order.status === 'new') {
            return 'process'
        };
    };

    if (text === 'accepted') {
        if (order.status === 'accepted') {
            return 'process'
        } else if (order.status === 'new') {
            return 'wait'
        } else {
            return 'finish'
        }
    }

    if (text === 'confirmed') {
        if (order.status === 'confirmed') {
            return 'process'
        } else if (order.status === 'new') {
            return 'wait'
        } else if (order.status === 'accepted') {
            return 'wait'
        } else {
            return 'finish'
        }
    }

    if (text === 'boxed') {
        if (order.status === 'boxed') {
            return 'process'
        }else if (order.status === 'confirmed') {
            return 'wait'
        } else if (order.status === 'new') {
            return 'wait'
        } else if (order.status === 'accepted') {
            return 'wait'
        } else {
            return 'finish'
        }
    }

    if (text === 'ontheway') {
        if (order.status === 'ontheway') {
            return 'process'
        }else if (order.status === 'boxed') {
            return 'wait'
        }else if (order.status === 'confirmed') {
            return 'wait'
        } else if (order.status === 'new') {
            return 'wait'
        } else if (order.status === 'accepted') {
            return 'wait'
        } else {
            return 'finish'
        }
    }

    if (text === 'delivered') {
        if (order.status === 'delivered') {
            return 'process'
        } else if (order.status === 'ontheway') {
            return 'wait'
        }else if (order.status === 'boxed') {
            return 'wait'
        }else if (order.status === 'confirmed') {
            return 'wait'
        } else if (order.status === 'new') {
            return 'wait'
        } else if (order.status === 'accepted') {
            return 'wait'
        } else {
            return 'finish'
        }
    }
  };

  export default defineOrderStatus;