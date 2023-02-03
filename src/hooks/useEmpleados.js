import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const URLAPI = "https://localhost:7121/api/Empleado";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

const useEmpleados = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate();

    const {
        empleados,
        loader,
        empleadoConsultado,
    } = state

    useEffect(() => {
        fetch(URLAPI)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                dispatch({ type: actionTypes.TOLIST, payload: data })
            })
            .catch((e) => console.log(e));
    }, [loader])


    const consultarEmpleado = id => {
        useEffect(() => {
            fetch(`${URLAPI}/${id}`)
                .then((resp) => resp.json())
                .then((data) => {
                    dispatch({ type: actionTypes.CONSULT, payload: data[0] })
                })
                .catch((e) => console.log(e));
        }, [empleadoConsultado]);
    }

    const eliminarEmpleado = async (id) => {
        try {
            const request = await fetch(`${URLAPI}/?id=${id}`, {
                method: "DELETE",
                headers,
            });
            const data = await request.text();
            if (data) {
                dispatch({ type: actionTypes.LOADER })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const guardaEmpleado = async (form, id = null) => {
        const formData = new FormData(form.current);

        let body = {
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            puestoId: Number(formData.get("puesto")),
        }

        if (id) {
            body = {
                ...body,
                empleadoId: Number(id),
            }
        }

        try {
            const request = await fetch(URLAPI, {
                method: "post",
                body: JSON.stringify(body),
                headers
            });
            const data = await request.text();
            if (data) {
                dispatch({ type: actionTypes.LOADER })
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const editarEmpleado = (id, empleado) => {
        navigate(`/edit/${id}`, {
            state: { empleado }
        })
    }

    return {
        empleados,
        loader,
        empleado: empleadoConsultado,

        consultarEmpleado,
        eliminarEmpleado,
        guardaEmpleado,
        editarEmpleado
    }
}

const initialState = {
    empleados: [],
    loader: true,
    empleadoConsultado: null,
}

const actionTypes = {
    TOLIST: 'TOLIST',
    CONSULT: 'CONSULT',
    LOADER: 'LOADER'
}

const reducerOBJECT = (state, payload) => ({
    [actionTypes.TOLIST]: {
        ...state,
        loader: false,
        empleados: payload
    },
    [actionTypes.CONSULT]: {
        ...state,
        empleadoConsultado: payload
    },
    [actionTypes.LOADER]: {
        ...state,
        loader: true
    }
})

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)?.[action.type] ?? state;
}

export default useEmpleados;
