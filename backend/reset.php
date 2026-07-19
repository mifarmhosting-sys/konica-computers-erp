<?php echo 'Resetting...'; \ = App\Models\User::find(1); \->password = Hash::make('password'); \->save();
