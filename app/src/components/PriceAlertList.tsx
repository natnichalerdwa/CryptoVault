import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { deletePriceAlert } from '../store/pricealert-store';
import { AppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import { PriceAlert } from '../models/PriceAlerts';

interface PriceAlertListProps {
  priceAlerts: PriceAlert[];
}

const PriceAlertList: React.FC<PriceAlertListProps> = ({ priceAlerts }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const handleDelete = (id: string) => {
    dispatch(deletePriceAlert(id));
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "20px auto",
        width: "100%",
        maxWidth: "1000px",
        backgroundColor: "#fff",
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
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1rem",
                textAlign: "center",
                padding: "16px",
                letterSpacing: "1px",
              }}
            >
              Alert ID
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center",
                padding: "16px",
                letterSpacing: "1px",
              }}
            >
              Asset ID
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center",
                padding: "16px",
                letterSpacing: "1px",
              }}
            >
              Name & Symbol
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "right",
                padding: "16px",
                letterSpacing: "1px",
              }}
              align="right"
            >
              Current Price
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "right",
                padding: "16px",
                letterSpacing: "1px",
              }}
              align="right"
            >
              Target Price
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "right",
                padding: "16px",
                letterSpacing: "1px",
              }}
              align="right"
            >
              Alert Type
            </TableCell>
            <TableCell
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "right",
                padding: "16px",
                letterSpacing: "1px",
              }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priceAlerts.map((alert) => (
            <TableRow
              key={alert.id}
              sx={{
                "&:nth-of-type(even)": { backgroundColor: "#f3e5f5" },
                "&:nth-of-type(odd)": { backgroundColor: "#ede7f6" },
                "&:hover": { backgroundColor: "#d1c4e9", cursor: "pointer" },
              }}
            >
              <TableCell sx={{ textAlign: "center", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>{alert.id}</TableCell>
              <TableCell sx={{ textAlign: "center", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>{alert.assetID}</TableCell>
              <TableCell sx={{ textAlign: "center", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>
                {`${alert.assetName} (${alert.assetSymbol})`}
              </TableCell>
              <TableCell sx={{ textAlign: "right", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>
                {alert.price.toFixed(2)}
              </TableCell>
              <TableCell sx={{ textAlign: "right", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>
                {alert.targetPrice.toFixed(2)}
              </TableCell>
              <TableCell sx={{ textAlign: "right", padding: "12px", fontSize: "1rem", color: "purple", fontWeight: "bold" }}>
                {alert.alertType}
              </TableCell>
              <TableCell sx={{ textAlign: "right", padding: "12px" }}>
                <Button
                  variant="contained"
                  sx={{
                    marginRight: 1,
                    backgroundColor: "#6a1b9a",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#4a0072" },
                    textTransform: "capitalize",
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                  }}
                  onClick={() => navigate(`/pricealerts/${alert.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#d32f2f",
                    borderColor: "#d32f2f",
                    "&:hover": { backgroundColor: "#ffcdd2", borderColor: "#b71c1c" },
                    textTransform: "capitalize",
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    margin: "6px"
                  }}
                  onClick={() => handleDelete(alert.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PriceAlertList;
