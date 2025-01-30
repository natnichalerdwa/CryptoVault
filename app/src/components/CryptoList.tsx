import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Cryptocurrency } from "../models/Cryptocurrency";
import { useTranslation } from "react-i18next";
import { i18n } from "../i18n";

// Interface for Props
interface CryptoListProps {
    cryptocurrencies: Cryptocurrency[];
    onSetAlert: (crypto: Cryptocurrency) => void; // Function to set alert
}

// Function to format the date
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10); // Extract YYYY-MM-DD
    const formattedTime = date.toTimeString().slice(0, 5); // Extract HH:MM
    return `${formattedDate}, ${formattedTime}`;
};

// CryptoList Component
const CryptoList: React.FC<CryptoListProps> = ({ cryptocurrencies, onSetAlert }) => {
    const { t } = useTranslation('common');
    return (
        <TableContainer
            component={Paper}
            sx={{
                margin: "20px auto",
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                maxHeight: "400px",
                overflowY: "auto",
            }}
        >
            <Table>
                <TableHead
                    sx={{
                        backgroundColor: "#6a1b9a",
                    }}
                >
                    <TableRow>
                        {[t('cryptoList.assetID.label'), "Name", "Symbol", "Price", "Currency", "Last Updated", ""].map((header) => (
                            <TableCell
                                key={header}
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.9rem",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    padding: "16px",
                                    letterSpacing: "1px",
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cryptocurrencies.map((crypto) => (
                        <TableRow
                            key={crypto.assetID}
                            sx={{
                                "&:nth-of-type(even)": { backgroundColor: "#f3e5f5" },
                                "&:nth-of-type(odd)": { backgroundColor: "#ede7f6" },
                                "&:hover": { backgroundColor: "#d1c4e9", cursor: "pointer" },
                            }}
                        >
                            <TableCell sx={{ textAlign: "center", color: "purple", fontWeight: "bold" }}>{crypto.assetID}</TableCell>
                            <TableCell sx={{ textAlign: "center", color: "purple", fontWeight: "bold"  }}>{crypto.assetName}</TableCell>
                            <TableCell sx={{ textAlign: "center", color: "purple", fontWeight: "bold"  }}>{crypto.assetSymbol}</TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    color: "purple",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                }}
                            >
                                {crypto.price.toFixed(2)}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    color: "purple",
                                    fontWeight: "bold",
                                }}
                            >
                                {crypto.currency}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    color: "purple",
                                }}
                            >
                                {formatDate(crypto.lastUpdated)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onSetAlert(crypto)}
                                    sx={{ textTransform: "capitalize",
                                    backgroundColor: "#6a1b9a",
                                    "&:hover": { backgroundColor: "#38006b",
                                    },
                                    padding: "4px 8px",
                                    fontSize: "0.9rem",
                                    }}
                                >
                                    Set Price Alert
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CryptoList;
