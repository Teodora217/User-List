export const formatData = (isoData) =>{
    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    return new Date(isoData).toLocaleDateString(undefined, options);
};