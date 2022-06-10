import React, { useState, useContext } from "react";
import { Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import { SudokuContext } from './SudokuContext';

function ButtonContainer(props) {
    const [solvingPuzzle, setSolvingPuzzle] = useState(false);
    const { initialBoard, currentBoard, updateCurrentBoard, updateInitialBoard } = useContext(SudokuContext);

    function solvePuzzle(e) {
        setSolvingPuzzle(true);
        setTimeout(() => {
            console.log(currentBoard);
            setSolvingPuzzle(false);
        }, 300);
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
                disabled={solvingPuzzle}
            >
                Generate Board
            </Button>
            <LoadingButton
                variant="outlined"
                color="secondary"
                startIcon={<BorderColorIcon />}
                onClick={(e) => solvePuzzle(e)}
                loading={solvingPuzzle}
                loadingIndicator="Solving..."
            >
                Solve Puzzle
            </LoadingButton>
            <Button
                variant="outlined"
                color="warning"
                startIcon={<EditIcon />}
                disabled={solvingPuzzle}
            >
                Edit Board
            </Button>
            <Button
                variant="outlined"
                color="success"
                startIcon={<SearchIcon />}
                disabled={solvingPuzzle}
            >
                Validate Board
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                disabled={solvingPuzzle}
            >
                Clear Board
            </Button>
        </Stack>
    )
}

export default ButtonContainer;