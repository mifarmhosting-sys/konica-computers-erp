<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$user = \App\Models\User::where('email', 'admin@konicacomputers.store')->first();
echo "User exists: " . ($user ? 'Yes' : 'No') . "\n";
if ($user) {
    echo "ID: " . $user->id . "\n";
    echo "Email: " . $user->email . "\n";
    echo "Password Hash: " . $user->password . "\n";
    echo "Test Check 'password123': " . (\Illuminate\Support\Facades\Hash::check('password123', $user->password) ? 'MATCH' : 'NO MATCH') . "\n";
}
