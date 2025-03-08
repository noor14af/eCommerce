import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';

const SortingCategories = () => {
    const [sortBy, setSortBy] = React.useState('');

    const handleChange = (event) => {
      setSortBy(event.target.value);
    };

    return (
        <Box display="flex" alignItems="center" mt={2}>
            <Typography >Sort By:</Typography>
            <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel id="sorting-label">Sort Options</InputLabel>
                <Select
                    labelId="sorting-label"
                    id="sorting-select"
                    value={sortBy}
                    label="Sort Options"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    <MenuItem value="price_high_to_low">Price High to Low</MenuItem>
                    <MenuItem value="price_low_to_high">Price Low to High</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SortingCategories;
