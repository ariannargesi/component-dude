import { useState } from "react"
import { Input, Button, Select } from "antd"
import { Switch, Modal } from "antd"
import { useSelector } from "react-redux"
import isVarName from "is-var-name"
import { Trash } from "react-feather"
import { PropItem, RootState, ScriptFormats, prop_types } from "../../types"
import styles from "./styles.module.sass"
const { Option } = Select
interface Prop {
    onConfirm: (list: PropItem[]) => void
}

// form initial state
const initialForm = {
    name: "",
    type: "any",
    required: false,
}

const PropConfig = (props: Prop) => {
    console.log('render')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const scriptType = useSelector((state: RootState) => state.app.config.scriptType)
    const statePropsList = useSelector((state: RootState) => state.app.config.propsList)

    
    // using this state to show props list insdie the modal
    const [propsList, setPropsList] = useState([])
    const [form, setForm] = useState(initialForm)

    
    const handleChange = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                ...e,
            }
        })
    }

    const typesList = scriptType === ScriptFormats.TS ? prop_types.ts : prop_types.js

    const handleInputChange = (e) => {
        const value = e.target.value.trim()
        const nameAlreadyExist =
            propsList.filter((item) => item.name === value).length > 0
        if (nameAlreadyExist) {
            setError(true)
            setErrorMessage(`"${value}" already exist`)
            return
        }
        handleChange({ name: e.target.value })
        const isValidName = isVarName(value)
        if (isValidName) {
            setError(false)
        } else {
            if (value) setError(true)
            setErrorMessage("Your prop name must be a valid javascript name")
        }
    }

    const handleAddProp = () => {
        setPropsList((prev) => [...prev, form])
        setForm(initialForm)
    }

    const handleDeleteProp = (index) => {
        setPropsList((propsList) => {
            return propsList.filter((item, index2) => index != index2)
        })
    }

    return (
        <>
            <h2>Component props</h2>
            {statePropsList.length === 0 && (
                <span>You have not set any prop yet. </span>
            )}
            <Button onClick={() => setModalVisible(true)}>
                Add/Delete props
            </Button>
            {statePropsList.length != 0 && (
                <div style={{ textAlign: "left" }}>
                    <table className={styles.table} style={{ width: "70%" }}>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                        </tr>
                        {propsList.map((item) => {
                            console.log('render')
                            return (
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.required ? "True" : "False"}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            )}

            <Modal
                title="Config props"
                centered
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                footer={false}
                onCancel={() => setModalVisible(false)}
                width={600}
            >
                <div className={styles.formContainer}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Input value={form.name} onChange={handleInputChange} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="name">Name</label>
                        <Select
                            placeholder='Select type'
                            onChange={(e) => handleChange({ type: e })}
                            style={{ width: 200, margin: '0 16px' }}
                        >
                            {typesList.map((item) => {
                                return (
                                    <Option key={item} value={item}>
                                        {item}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>required:</label>
                        <Switch
                            defaultChecked={form.required}
                            onChange={(e) => handleChange({ required: e })}
                        />
                    </div>
                    <Button
                        disabled={error || !form.name}
                        onClick={handleAddProp}
                    >
                        Add
                    </Button>
                </div>
                {error && <span className={styles.error}>{errorMessage}</span>}
                {propsList.length != 0 && (
                    <table className={styles.table}>
                        <thead>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                        </thead>
                        <tbody>
                            {propsList.map((item, index) => {
                                return (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>
                                            {item.required ? "True" : "False"}
                                        </td>
                                        <td>
                                            <Trash
                                                onClick={() =>
                                                    handleDeleteProp(index)
                                                }
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
                <Button
                    block
                    type="primary"
                    onClick={() => {
                        props.onConfirm(propsList)
                        setModalVisible(false)
                    }}
                    style={{ marginTop: "16px" }}
                >
                    Done
                </Button>
            </Modal>
        </>
    )
}

export default PropConfig
