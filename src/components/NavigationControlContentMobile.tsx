import { useState } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import NavigationControlContent from './NavigationControlContent';

export default function NavigationControlMobile() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Button onClick={() => setIsExpanded(true)}>
          <Menu />
        </Button>
      </Box>
      <Drawer open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            py: 2,
          }}
        >
          <Button onClick={() => setIsExpanded(false)}>
            <Close />
          </Button>
        </Box>
        <NavigationControlContent />
      </Drawer>
    </>
  );
}
