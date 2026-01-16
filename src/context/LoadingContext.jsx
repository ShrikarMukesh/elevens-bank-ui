import { createContext, useState, useContext } from "react";
import Loader from "../components/Loader";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {isLoading && <Loader fullScreen />}
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;
