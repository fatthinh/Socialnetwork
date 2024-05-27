import { createContext, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

    return (
        <AppContext.Provider value={{ isCreatePostVisible, setIsCreatePostVisible }}>{children}</AppContext.Provider>
    );
}

export default AppProvider;
