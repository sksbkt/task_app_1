"use client";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { visuallyHidden } from "@mui/utils";
import { ChangeEvent, MouseEvent, use, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPage, setPerPage } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof UserProps;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: false,
    label: "Avatar",
  },
  {
    id: "first_name",
    numeric: false,
    disablePadding: false,
    label: "First name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof UserProps
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleReload?: () => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box
                component="span"
                sx={visuallyHidden}
              >
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleReload?: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleReload } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => alert("The api doesnt support DELETE method")}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Reload">
          <IconButton onClick={handleReload}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable({
  usersList,
  handleReload,
  isLoading = true,
}: {
  usersList: UserProps[];
  handleReload: () => void;

  isLoading: boolean;
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof UserProps>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { page, perPage, total } = useAppSelector((state) => state.userSlice);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserProps
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = usersList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(() => {
    return usersList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, perPage, usersList]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ width: { sm: "100%", md: "80%" }, mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              handleReload={handleReload}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={usersList.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(e) => {
                          router.push("/2");
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, row.id);
                          }}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell align="left">
                          <Avatar
                            alt={row.first_name}
                            src={row.avatar}
                          />
                        </TableCell>
                        <TableCell align="left">{row.first_name}</TableCell>
                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 24]}
              component="div"
              count={total}
              rowsPerPage={perPage}
              page={page}
              onPageChange={(s, page) => {
                dispatch(setPage(page));
              }}
              onRowsPerPageChange={(s) => {
                dispatch(setPerPage(parseInt(s.target.value)));
              }}
            />
          </Paper>
        </>
      )}
    </Box>
  );
}
