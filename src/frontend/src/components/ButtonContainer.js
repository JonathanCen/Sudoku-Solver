import React, { useState, useContext } from "react";
import { Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { SudokuContext } from './SudokuContext';

function ButtonContainer(props) {
    const [solvingSudoku, setSolvingSudoku] = useState(false);
    const { edittingSudoku, updateEdittingSudoku, updateBoardStatus, initialBoard, currentBoard, updateCurrentBoard, updateInitialBoard } = useContext(SudokuContext);

    function generateSudoku(e) {
        updateBoardStatus(1);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/generate-sudoku", requestOptions)
            .then((response) => response.json())
            .then((data) => { updateCurrentBoard(data.unsolved_sudoku_board); updateInitialBoard(data.unsolved_sudoku_board); updateBoardStatus(2); })
    }

    function solveSudoku(e) {
        updateBoardStatus(3);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                unsolved_sudoku_board: JSON.stringify(currentBoard)
            })
        };
        setSolvingSudoku(true);
        fetch("/api/solve-sudoku", requestOptions)
            .then((response) => response.json())
            .then((data) => { updateCurrentBoard(data.solved_sudoku_board); setSolvingSudoku(false); updateBoardStatus(4); });

    }

    /*
     * Allows users to edit the board and checks there is at least one solution to the user generated sudoku
     */
    function editSudoku(e) {
        if (edittingSudoku) {
            updateBoardStatus(6);
            // Check if the board is solvable, if not update the sign and return 
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    unsolved_sudoku_board: JSON.stringify(initialBoard)
                })
            };

            fetch("/api/check-if-valid-sudoku", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.Solvable === "true") {
                        updateEdittingSudoku(); updateBoardStatus(8);
                    } else {
                        updateBoardStatus(7);
                    }
                });

            return
        }
        updateBoardStatus(5);
        clearSudoku(e, true);
        updateEdittingSudoku();
    }

    /*
     * Validates whether the board is correct
     * ! Maybe rename "validate" to something else
     */
    function validateSudoku(e) {
        updateBoardStatus(9);
        fetch(`/api/validate-sudoku?board=${JSON.stringify(currentBoard)}`)
            .then((response) => response.json())
            .then((data) => { data.is_correct ? updateBoardStatus(11) : updateBoardStatus(10) });
    }

    /* 
     *  Unmarks all cells and leaves only the inital board
     */
    function clearSudoku(e, fromEditingSudoku = false) {
        if (!fromEditingSudoku) {
            updateBoardStatus(12);
        }
        if (edittingSudoku) {
            const blankBoard = Array(9).fill(Array(9).fill(-1));
            updateInitialBoard(blankBoard)
            updateCurrentBoard(blankBoard);
        } else {
            updateCurrentBoard(initialBoard);
        }
        if (!fromEditingSudoku) {
            updateBoardStatus(13);
        }
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{
                "flex-wrap": "wrap",
                width: "600px",
            }}
        >
            <Button
                variant="outlined"
                color="primary"
                startIcon={<BuildIcon />}
                onClick={(e) => generateSudoku(e)}
                disabled={solvingSudoku || edittingSudoku}
            >
                Generate Board
            </Button>
            <LoadingButton
                variant="outlined"
                color="secondary"
                startIcon={<BorderColorIcon />}
                onClick={(e) => solveSudoku(e)}
                disabled={edittingSudoku}
                loading={solvingSudoku}
                loadingIndicator="Solving..."
            >
                Solve Sudoku
            </LoadingButton>
            <Button
                variant="outlined"
                color="warning"
                startIcon={edittingSudoku ? <EditOffIcon /> : <EditIcon />}
                onClick={editSudoku}
                disabled={solvingSudoku}
            >
                {edittingSudoku ? "Stop Editting" : "Edit Board"}
            </Button>
            <Button
                variant="outlined"
                color="success"
                startIcon={<SearchIcon />}
                onClick={(e) => validateSudoku(e)}
                disabled={solvingSudoku || edittingSudoku}
            >
                Validate Sudoku
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={(e) => clearSudoku(e)}
                disabled={solvingSudoku}
            >
                Clear Board
            </Button>
        </Stack>
    )
}

export default ButtonContainer;