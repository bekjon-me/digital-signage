<?php
namespace App\DTO;

class UserDTO
{
    public string $name;
    public string $company_name;
    public string $email;
    public string $password;

    public function __construct(string $name, string $company_name, string $email, string $password)
    {
        $this->name = $name;
        $this->company_name = $company_name;
        $this->email = $email;
        $this->password = $password;
    }
}
