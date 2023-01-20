const getProperties = (obj)=>{
    if(obj.type=="ToggleSwitch"){
        return `"${obj.name}":{"type": {"bool": true}}`
    }
    if(obj.type=="ColorPicker"){
        return `"${obj.name}":{"type": {"fill": {"solid": {"color": true}}}}`
    }
    if(obj.type=="NumUpDown"||obj.type=="FontPicker"){
        return `"${obj.name}":{"type": {"numeric": true}}`
    }
    if(obj.type=="Dropdown"){
        return `"${obj.name}":{"type": {"enumeration": []}}`
    }
    if(obj.type=="TextInput"){
        return `"${obj.name}":{"type": {"text": true}}`
    }
}

export const getCapability = (obj)=>{
    return `"${obj.name}":{"properties":{${Object.values(obj).filter(d=>(d as any)['type']).map(d=>getProperties(d)).join(",")}}}`
}