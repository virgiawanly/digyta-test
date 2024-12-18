<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in-progress';
    case Completed = 'completed';

    /**
     * Get all possible values of the enum.
     *
     * @return array<int, string>
     */
    public static function getEntries(): array
    {
        return [
            self::Pending->value,
            self::InProgress->value,
            self::Completed->value,
        ];
    }
}
