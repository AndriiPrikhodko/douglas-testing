const generateActiveFilters = (data: IData['filter']) => {
    const filters: string[] = []
    Object.entries(data).map(([key,value]: [string, string]) => {
        if (key !== 'Highlights') {
            filters.push(value)
        }
        else {
            Object.entries(data['Highlights']).map(([key,value]: [string, boolean]) => {
                if(value) filters.push(key)
            })
        }
    })

    return filters
}

export default generateActiveFilters
